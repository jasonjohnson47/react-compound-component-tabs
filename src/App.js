import React, { useState } from "react";
import "./styles.css";

// tabs using compound components
// learned, copied and modified from Ryan Florence talk at Phoenix ReactJS (https://www.youtube.com/watch?v=hEGg-3pIHlE)
// modified to use Function Components and to be accessible

const Tab = (props) => {
    return (
        <button
            type="button"
            role="tab"
            aria-selected={props.isActive}
            aria-controls={`tabpanel-${props.tabIndex}`}
            id={`tab-${props.tabIndex}`}
            onClick={() => props.onActivate()}
        >
            {props.children}
        </button>
    );
};

const TabList = (props) => {
    const children = React.Children.map(props.children, (child, index) => {
        return React.cloneElement(child, {
            isActive: index === props.activeIndex,
            tabIndex: index,
            onActivate: () => {
                props.onActivateTab(index);
            },
        });
    });
    return <div role="tablist">{children}</div>;
};

const TabPanel = (props) => {
    return (
        <div
            tabIndex="0"
            role="tabpanel"
            id={`tabpanel-${props.tabIndex}`}
            aria-labelledby={`tab-${props.tabIndex}`}
            hidden={!props.isActive}
        >
            {props.children}
        </div>
    );
};

const TabPanels = (props) => {
    const children = React.Children.map(props.children, (child, index) => {
        if (child.type === TabPanel) {
            return React.cloneElement(child, {
                isActive: index === props.activeIndex,
                tabIndex: index,
            });
        } else {
            return child;
        }
    });
    return <div className="tab-panels">{children}</div>;
};

const Tabs = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const children = React.Children.map(props.children, (child) => {
        if (child.type === TabPanels) {
            //const clone = Object.assign({}, child.props);
            return React.cloneElement(child, {
                activeIndex: activeIndex,
            });
        } else if (child.type === TabList) {
            return React.cloneElement(child, {
                activeIndex: activeIndex,
                onActivateTab: (activeIndex) => {
                    setActiveIndex(activeIndex);
                },
            });
        } else {
            return child;
        }
    });

    return <div className="tabs">{children}</div>;
};

const App = () => {
    return (
        <div>
            <Tabs>
                <TabList>
                    <Tab>Tab 1</Tab>
                    <Tab>Tab 2</Tab>
                    <Tab>Tab 3</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <p>Content for Tab 1</p>
                    </TabPanel>
                    <TabPanel>
                        <p>Content for Tab 2</p>
                    </TabPanel>
                    <TabPanel>
                        <p>Content for Tab 3</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
};

export default App;
