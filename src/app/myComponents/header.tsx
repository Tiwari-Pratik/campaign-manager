"use client"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"
const Header = () => {

  return (
    <header className="border border-bottom-black py-4 px-8 fixed z-100 left-0 top-0 w-full
      mb-10 font-semibold bg-white bg-opacity-50 backdrop-blur-lg shadow-md">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            campaign Manager
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )

}

export default Header


