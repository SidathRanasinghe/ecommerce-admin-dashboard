import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

/**
 * Custom application error class
 */
export class AppException extends Error {
  public readonly code: string
  public readonly statusCode: number
  public readonly details?: unknown

  constructor(
    message: string,
    code: string = 'INTERNAL_ERROR',
    statusCode: number = 500,
    details?: unknown
  ) {
    super(message)
    this.name = 'AppException'
    this.code = code
    this.statusCode = statusCode
    this.details = details
  }
}

/**
 * Predefined error types
 */
export const ErrorCodes = {
  // Authentication errors
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  
  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  
  // Resource errors
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  
  // Business logic errors
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
  OPERATION_FAILED: 'OPERATION_FAILED',
  
  // External service errors
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  
  // Database errors
  DATABASE_ERROR: 'DATABASE_ERROR',
  
  // General errors
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  RATE_LIMITED: 'RATE_LIMITED',
} as const

/**
 * Error factory functions
 */
export const createError = {
  unauthorized: (message = 'Unauthorized access') =>
    new AppException(message, ErrorCodes.UNAUTHORIZED, 401),
    
  forbidden: (message = 'Access forbidden') =>
    new AppException(message, ErrorCodes.FORBIDDEN, 403),
    
  notFound: (resource = 'Resource', id?: string) =>
    new AppException(
      `${resource}${id ? ` with id ${id}` : ''} not found`,
      ErrorCodes.NOT_FOUND,
      404
    ),
    
  validation: (message: string, details?: unknown) =>
    new AppException(message, ErrorCodes.VALIDATION_ERROR, 400, details),
    
  alreadyExists: (resource = 'Resource') =>
    new AppException(
      `${resource} already exists`,
      ErrorCodes.ALREADY_EXISTS,
      409
    ),
    
  internal: (message = 'Internal server error', details?: unknown) =>
    new AppException(message, ErrorCodes.INTERNAL_ERROR, 500, details),
    
  database: (message = 'Database operation failed', details?: unknown) =>
    new AppException(message, ErrorCodes.DATABASE_ERROR, 500, details),
}

/**
 * Handles API errors and returns appropriate NextResponse
 */
export function handleApiError(error: unknown): NextResponse {
  console.error('API Error:', error)
  
  // Handle custom AppException
  if (error instanceof AppException) {
    return NextResponse.json(
      {
        success: false,
        error: error.code,
        message: error.message,
        ...(process.env.NODE_ENV === 'development' && { details: error.details }),
      },
      { status: error.statusCode }
    )
  }
  
  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        error: ErrorCodes.VALIDATION_ERROR,
        message: 'Validation failed',
        details: error.errors.map(err => ({
          path: err.path.join('.'),
          message: err.message,
        })),
      },
      { status: 400 }
    )
  }
  
  // Handle Prisma errors
  if (error && typeof error === 'object' && 'code' in error) {
    const prismaError = error as { code: string; message: string }
    
    switch (prismaError.code) {
      case 'P2002':
        return NextResponse.json(
          {
            success: false,
            error: ErrorCodes.ALREADY_EXISTS,
            message: 'A record with this data already exists',
          },
          { status: 409 }
        )
      case 'P2025':
        return NextResponse.json(
          {
            success: false,
            error: ErrorCodes.NOT_FOUND,
            message: 'Record not found',
          },
          { status: 404 }
        )
      default:
        console.error('Prisma error:', prismaError)
        return NextResponse.json(
          {
            success: false,
            error: ErrorCodes.DATABASE_ERROR,
            message: 'Database operation failed',
          },
          { status: 500 }
        )
    }
  }
  
  // Handle unknown errors
  const message = error instanceof Error ? error.message : 'Unknown error occurred'
  return NextResponse.json(
    {
      success: false,
      error: ErrorCodes.INTERNAL_ERROR,
      message: process.env.NODE_ENV === 'development' ? message : 'Internal server error',
    },
    { status: 500 }
  )
}

/**
 * Async error wrapper for API routes
 */
export function withErrorHandling<T extends unknown[], R>(
  handler: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R | NextResponse> => {
    try {
      return await handler(...args)
    } catch (error) {
      return handleApiError(error)
    }
  }
}