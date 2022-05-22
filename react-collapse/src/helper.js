export function classes(...args) {
  return args.filter(Boolean).join(' ');
}
