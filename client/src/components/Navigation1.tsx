import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href = "#", ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const MainNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const mobileMenu = document.getElementById("mobile-menu");
      const menuButton = document.getElementById("menu-button");

      if (
        isOpen &&
        mobileMenu &&
        !mobileMenu.contains(event.target as Node) &&
        !menuButton?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      // Add some offset for the fixed navbar
      const offset = 100; // Adjust this value based on your navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update URL without page reload
      window.history.pushState({}, "", `/#${sectionId}`);
    }
  };

  return (
    <>
      <nav
        className={`
        fixed top-5 left-1/2 transform -translate-x-1/2 z-50 flex w-[90%] items-center justify-between rounded-2xl py-4 px-6 shadow-lg md:w-[70%] lg:w-[75%] lg:max-w-screen-xl transition-all duration-500 ease-in-out ${
          isScrolled && !isOpen
            ? "-translate-y-full -translate-x-1/2"
            : "translate-y-0 -translate-x-1/2"
        }
        bg-white/10 backdrop-blur-md border border-white/20
        
      `}
      >
        <div className="flex w-full items-center justify-between px-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className="text-white text-xl font-semibold font-montserrat">
              ChemStudio
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList className="gap-6">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="text-white/80 hover:text-white transition-colors font-medium px-3 py-2 rounded-lg hover:bg-white/10"
                    asChild
                  >
                    <a href="/periodic-table">Periodic Table</a>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="text-white/80 hover:text-white transition-colors font-medium px-3 py-2 rounded-lg hover:bg-white/10"
                    asChild
                  >
                    <a href="/mix-lab">Mix Lab</a>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="text-white/80 hover:text-white transition-colors font-medium px-3 py-2 rounded-lg hover:bg-white/10"
                    asChild
                  >
                    <a href="/knowledge-center">Knowledge Center</a>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="text-white/80 hover:text-white transition-colors font-medium px-3 py-2 rounded-lg hover:bg-white/10"
                    asChild
                  >
                    <a href="/ai-assistant">AI Assistant</a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Language Selector */}
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex justify-center">
              <Button
                className="bg-gradient-to-r from-primary to-secondary text-white rounded-full hover:from-primary/90 hover:to-secondary/90 px-6 py-2 font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                asChild
              >
                <a href="/join-us">Join Beta</a>
              </Button>
            </div>

            {/* Theme Toggle */}
            <button className="text-gray-300 hover:text-white">
              {/* Add your theme toggle icon here */}
            </button>
          </div>
          {/* Mobile Menu Button */}
          <button
            id="menu-button"
            className="lg:hidden text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
            onClick={() => setIsOpen(!isOpen)}
          >
            <IoMenu size={24} />
          </button>
        </div>

        {/* Mobile Menu - Add lg:hidden to hide on desktop */}
        <div
          id="mobile-menu"
          className={`
            fixed -top-5 -left-6 w-[300px] h-screen 
            bg-white/10 backdrop-blur-md border-r border-white/20 transform transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
            z-[60] lg:hidden
          `}
        >
          <div className="flex flex-col h-full p-6">
            {/* Logo */}
            <div className="flex items-center justify-between mb-8">
              <a href="/" className="flex items-center gap-2">
                <span className="text-white text-xl font-semibold font-montserrat">
                  ChemStudio
                </span>
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-4">
              {[
                { href: "/periodic-table", label: "Periodic Table" },
                { href: "/mix-lab", label: "Mix Lab" },
                { href: "/knowledge-center", label: "Knowledge Center" },
                { href: "/ai-assistant", label: "AI Assistant" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-white/80 hover:text-white text-lg transition-colors py-2 px-3 rounded-lg hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Bottom Section */}
            <div className="mt-auto">
              <div className="flex justify-center">
                <Button
                  className="bg-gradient-to-r from-primary to-secondary text-white w-full rounded-full hover:from-primary/90 hover:to-secondary/90 px-6 font-medium transition-all duration-300 shadow-lg"
                  asChild
                >
                  <a href="/join-us">Join Beta</a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay - Already has lg:hidden */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-white/10 backdrop-blur-sm lg:hidden z-[55]"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* QR Code Modal */}
        <Dialog open={showQRModal} onOpenChange={setShowQRModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center">
                Scan QR Code to Download
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center p-6">
              <div className="w-64 h-64 flex items-center justify-center bg-white rounded-lg">
                {/* QR Code placeholder - you can install qrcode.react if needed */}
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">📱</div>
                  <p className="text-sm">QR Code</p>
                </div>
              </div>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Scan this QR code with your mobile device to download our app
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </nav>
    </>
  );
};

export default MainNavbar;
export { MainNavbar as Navigation1 };
