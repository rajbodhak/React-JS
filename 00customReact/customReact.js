function customRender(reactElement, container) {
    // const domElement = document.createElement(reactElement.type);
    // domElement.innerHTML = reactElement.children;
    // domElement.setAttribute('href', reactElement.props.href);
    // domElement.setAttribute('target', reactElement.props.children);

    // container.appendChild(domElement);

    // In Optimal Approach
    const domElement = document.createElement(reactElement.type);
    domElement.innerHTML = reactElement.children;
    for (const prop in reactElement.props) {
        if(prop === 'childer') continue;
        domElement.setAttribute(prop, reactElement.props[prop]);
        console.log(`${prop}: ${reactElement.props[prop]}`);

    }
    container.appendChild(domElement);
}
 
const reactElement = {
    type: 'a',
    props: {
        href: 'https://google.com',
        target: '_blank' 
    },
    children: 'Click to visit Google'
}

const mainContainer = document.getElementById('root');

customRender(reactElement, mainContainer);