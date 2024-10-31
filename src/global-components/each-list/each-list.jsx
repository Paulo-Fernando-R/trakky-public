import { Children } from "react";

/**
 * A function that renders each item in a list using the provided render function.
 *
 * @param  render - The function used to render each item in the list.
 * @param  of - The list of items to render.
 * @return {array} An array of rendered items.
 */
const EachList = ({ render, of }) => {
    return Children.toArray(of.map((item, index) => render(item, index)));
};

export default EachList;
