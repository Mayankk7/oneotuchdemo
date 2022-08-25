import React from "react";
import { Tab } from "@headlessui/react";
import Privacy from "./Privacy";
import Blacklist from "./Blacklist";
import Contact from "./Contact";
import Password from "./Password";
import { tabs } from "../../data/settingTabs";

function Tabs() {
  return (
    <div className="mt-10 md:px-5 border-[1px] border-gray-200">
      <Tab.Group>
        <Tab.List className="md:px-3 px-1 space-y-0.5 md:space-y-0">
          {tabs?.map((tab, index) => (
            <Tab
              key={index + tab}
              className={({ selected }) =>
                selected
                  ? "bg-white w-full md:w-max md:border-b-4 border-b-2 px-3 mx-0.5 md:px-20 py-2 md:py-3 font-bold border-main-red text-main-red"
                  : "bg-main-red w-full md:w-max text-white px-3 md:px-20 py-2 md:py-3 mx-0.5"
              }
            >
              <span className="flex items-center gap-x-4 md:gap-x-2">
                {tab.icon} {tab.name}
              </span>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <Privacy />
          </Tab.Panel>
          <Tab.Panel>
            <Blacklist />
          </Tab.Panel>
          <Tab.Panel>
            <Contact />
          </Tab.Panel>
          <Tab.Panel>
            <Password />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default Tabs;
