import { Outlet } from "react-router-dom";
// import Navbar from "@/components/Navbar/Navbar";
import { DotPattern } from "@/components/(External)/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { NavbarDemo } from "./NavbarDemo/NavbarDemo";
import Navbar from "./Navbar/Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col w-screen items-center justify-center overflow-hidden rounded-lg bg-background">
      {/* Background Pattern */}
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
        )}
      />
      <div className="max-w-screen-lg w-full m-auto">
        {/* <NavbarDemo /> */}
        <Navbar />

        <main className="flex-1 container mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
