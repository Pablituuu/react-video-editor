import { cn } from "@/lib/utils";
import { HorizontalGradient } from "@/components/horizontal-gradient";
import { FeaturedTestimonials } from "@/components/featured-testimonials";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
        {children}
        <div className="relative w-full z-20 hidden md:flex border-l border-neutral-100 dark:border-neutral-800 overflow-hidden bg-gray-50 dark:bg-neutral-900 items-center justify-center">
          <div className="max-w-sm mx-auto">
            <FeaturedTestimonials />
            <p
              className={cn(
                "font-semibold text-xl text-center text-neutral-700 dark:text-neutral-300"
              )}
            >
              Join thousands of users already
            </p>
            <p
              className={cn(
                "font-normal text-base text-center text-neutral-500 dark:text-neutral-400 mt-8"
              )}
            >
              With lots of AI applications around, Desigcombo stands out with
              its state of the art Shitposting capabilities.
            </p>
          </div>
          <HorizontalGradient className="top-20" />
          <HorizontalGradient className="bottom-20" />
          <HorizontalGradient className="-right-80 transform rotate-90 inset-y-0 h-full scale-x-150" />
          <HorizontalGradient className="-left-80 transform rotate-90 inset-y-0 h-full scale-x-150" />
        </div>
      </div>
    </>
  );
}
