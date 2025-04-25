export function cleanAndDecodeResult(input: string) {
  if (typeof input !== 'string') {
    return String(input) // Or handle differently
  }
  return input.replace(/[^\x20-\x7E]/g, '') // Example cleanup
}