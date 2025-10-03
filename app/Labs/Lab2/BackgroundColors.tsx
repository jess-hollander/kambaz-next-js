export default function BackgroundColors() {
    return (
<div id="wd-css-background-colors">
    <h3 className="wd-bg-color-blue wd-fg-color-white">
        Background color</h3>
    <p className="wd-bg-color-red wd-fg-color-white">
        This background of this paragraph is red but
        <span className="wd-bg-color-green
                     wd-fg-color-white">
            the background of this text is green
            and the foreground white
        </span>
    </p>
    <h3 className="wd-bg-color-white wd-fg-color-blue">
        White on Blue Heading</h3>
    <p className="wd-bg-color-black wd-fg-color-red">
        Black on Red Paragraph </p>
</div>
    );
}