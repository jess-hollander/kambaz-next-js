"use client";

import Container from "react-bootstrap/esm/Container";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import BackgroundColors from './BackgroundColors';
import BootstrapForms from './BootstrapForms';
import BootstrapGrids from './BootstrapGrids';
import BootstrapLists from './BootstrapLists';
import BootstrapNaviagtion from './BootstrapNaviagtion';
import BootstrapTables from './BootstrapTables';
import Borders from './Borders';
import Corners from './Corners';
import Dimensions from './Dimensions';
import Flex from './Flex';
import Float from './Float';
import ForegroundColors from './ForegroundColors';
import GridLayout from './GridLayout';
import Margins from './Margins';
import Padding from './Padding';
import Positions from './Positions';
import ReactIcons from './ReactIcons';
import ScreenSizeLabel from './ScreenSizeLabel';
import Selectors from './Selectors';
import Zindex from './Zindex';

export default function Lab2() {
    const components = [
        { name: 'BackgroundColors', Comp: BackgroundColors },
        { name: 'BootstrapForms', Comp: BootstrapForms },
        { name: 'BootstrapGrids', Comp: BootstrapGrids },
        { name: 'BootstrapLists', Comp: BootstrapLists },
        { name: 'BootstrapNaviagtion', Comp: BootstrapNaviagtion },
        { name: 'BootstrapTables', Comp: BootstrapTables },
        { name: 'Borders', Comp: Borders },
        { name: 'Corners', Comp: Corners },
        { name: 'Dimensions', Comp: Dimensions },
        { name: 'Flex', Comp: Flex },
        { name: 'Float', Comp: Float },
        { name: 'ForegroundColors', Comp: ForegroundColors },
        { name: 'GridLayout', Comp: GridLayout },
        { name: 'Margins', Comp: Margins },
        { name: 'Padding', Comp: Padding },
        { name: 'Positions', Comp: Positions },
        { name: 'ReactIcons', Comp: ReactIcons },
        { name: 'ScreenSizeLabel', Comp: ScreenSizeLabel },
        { name: 'Selectors', Comp: Selectors },
        { name: 'Zindex', Comp: Zindex },
    ];

    return (
        <Container>
            <div id="wd-lab2" className="container">
                <Container>
            <div id="wd-lab2" className="container">
                <h2>Lab 2 - Cascading Style Sheets</h2>
                <h3>Styling with the STYLE attribute</h3>
                <p>
                    Style attribute allows configuring look and feel
                    right on the element. Although it&apos;s very convenient
                    it is considered bad practice and you should avoid
                    using the style attribute
                </p>
                <div id="wd-css-id-selectors">
                    <h3>ID selectors</h3>
                    <p id="wd-id-selector-1">
                        Instead of changing the look and feel of all the
                        elements of the same name, e.g., P, we can refer to a specific element by its ID
                    </p>
                    <p id="wd-id-selector-2">
                        Here&apos;s another paragraph using a different ID and a different look and
                        feel
                    </p>
                </div>
                <div id="wd-css-class-selectors">
                    <h3>Class selectors</h3>

                    <p className="wd-class-selector">
                        Instead of using IDs to refer to elements, you can use an element&apos;s CLASS attribute
                    </p>

                    <h4 className="wd-class-selector">
                        This heading has same style as paragraph above
                    </h4>

                </div>
                <div id="wd-css-document-structure">
                    <div className="wd-selector-1">
                        <h3>Document structure selectors</h3>
                        <div className="wd-selector-2">
                            Selectors can be combined to refer elements in particular
                            places in the document
                            <p className="wd-selector-3">
                                This paragraph&apos;s red background is referenced as
                                <br />
                                .selector-2 .selector3<br />
                                meaning the descendant of some ancestor.<br />
                                <span className="wd-selector-4">
                                    Whereas this span is a direct child of its parent
                                </span><br />
                                You can combine these relationships to create specific
                                styles depending on the document structure
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </Container>
                {components.map(({ name, Comp }) => (
                    <section key={name} style={{ marginBottom: 28 }}>
                        <h3>{name}</h3>
                        <Comp />
                    </section>
                ))}
            </div>
        </Container>
    );
}
