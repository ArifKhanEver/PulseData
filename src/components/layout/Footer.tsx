export default function Footer() {
  return (
    <footer className="border-t bg-background h-16 flex items-center justify-center text-muted-foreground text-sm mt-auto">
      &copy; {new Date().getFullYear()} PulseData. All rights reserved.
    </footer>
  );
}
