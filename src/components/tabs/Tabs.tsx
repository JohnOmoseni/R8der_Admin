import { cn } from "@/lib/utils";
import { TabProps, TabsProps } from "@/types";

export const Tabs = ({ activeTab, changeTab, tabIDs }: TabsProps) => {
  return (
    <div className="min-w-max rounded-md border border-input bg-background-100 p-1">
      <ul role="tablist" aria-label="Tabs" className="row-flex-btwn">
        {tabIDs.map((tab, idx) => {
          return (
            <Tab key={idx} id={tabIDs[idx]} activeTab={activeTab} tab={tab} changeTab={changeTab} />
          );
        })}
      </ul>
    </div>
  );
};

const Tab = ({ id, activeTab, tab, changeTab, className }: TabProps) => {
  return (
    <li
      id={id}
      role="tab"
      aria-selected={activeTab === id ? "true" : "false"}
      className={cn(
        "relative cursor-pointer rounded-lg px-5 py-1.5 text-center text-sm font-medium capitalize sm:px-7",
        activeTab === id ? "bg-secondary-100 font-semibold text-foreground-variant" : "text-grey",

        className
      )}
      onClick={() => changeTab(id)}
    >
      {tab}
    </li>
  );
};
