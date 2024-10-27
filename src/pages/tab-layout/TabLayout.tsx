import { NavLink, Outlet, useLocation } from "react-router-dom";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import styles from "./tab-layout.module.css";
import { useEffect, useState } from "react";

// empty is metronome page
type TABS = "" | "music";

const TabLayout = () => {
  const { pathname } = useLocation();
  const [tab, setTab] = useState<TABS>(pathname.split("/")?.pop() as TABS);

  // handle browser navigation like back-arrow
  useEffect(() => {
    setTab(pathname.split("/")?.pop() as TABS);
  }, [pathname]);

  return (
    <>
      <Outlet />
      <ToggleGroup.Root
        className={styles.tabBar}
        type="single"
        defaultValue="metronome"
        aria-label="Text alignment"
      >
        <ToggleGroup.Item
          asChild
          className={`${styles.tabItem} ${tab === "" && styles.inactiveTab}`}
          value="metronome"
          aria-label="Metronome Tab"
          onClick={() => setTab("")}
        >
          <NavLink to="/">Metronome</NavLink>
        </ToggleGroup.Item>
        <ToggleGroup.Item
          asChild
          className={`${styles.tabItem} ${
            tab === "music" && styles.inactiveTab
          }`}
          value="music"
          aria-label="Music Tab"
          onClick={() => setTab("music")}
        >
          <NavLink to="/music">Music</NavLink>
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </>
  );
};

export default TabLayout;
