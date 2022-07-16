const createElement = (elementName) => document.createElement(elementName);
const createTextElement = (text) => document.createTextNode(text);

const createTextNode = (elementName, text) => {
  return treeBuilder(
    createElement(elementName), [
      createTextElement(text)
    ]
  );
}

const createButtonNode = (textValue = "Press Me", onClickAction) => {
  const element = createElement('input')
  element.type = 'button';
  element.value = textValue;
  element.onclick = onClickAction;
  return element;
};

const createRowNode = (values, cellType = 'td') => {
  const cells = values.map(value => createTextNode(cellType, value)); 
  return treeBuilder(createElement('tr'), cells);
}

const createRowNodes = (headerRowNode = {}, data) => {
  const customRowNodes = data.map(object => {
    const values = Object.values(object);
    return createRowNode(values);
  });
  return [headerRowNode].concat(customRowNodes);
};

const createTableNode = (rows) => {
  return treeBuilder(
    createElement('table'), [
      treeBuilder(
        createElement('tbody'),
        rows
      )
    ]
  );
};

const treeBuilder = (rootNode, leaves = []) => {
  for (let i = 0; i < leaves.length; i++) {
    const leaf = leaves[i];
    const oldRoot = rootNode.children[i];

    if (oldRoot) {
      rootNode.replaceChild(leaf, oldRoot);
    } else {
      rootNode.append(leaf);
    }
  }

  return rootNode;
};

const assignClassToElement = (element, className) => {
  element.setAttribute('class', className);
  return element;
}

const noDataUI = (rootNode, {refreshAction, clearAction}) => {
  return treeBuilder(
    rootNode, [
      treeBuilder(
        createTextNode('H1', 'Service Worker Example')
      ),
      treeBuilder(
        createTextNode('H1', 'No data!')
      ),
      treeBuilder(
        assignClassToElement(createElement('div'), 'centered'), [
          createButtonNode('Refresh', refreshAction),
          createButtonNode('Clear', clearAction)
        ]
      )
    ]
  )
};

const dataUI = (rootNode, data, {refreshAction, clearAction}) => {
  return treeBuilder(
    rootNode, [
      treeBuilder(
        createTextNode('H1', 'Service Worker Example')
      ),
      createTableNode(
        createRowNodes(
          createRowNode(Object.keys(data[0]), 'th'),
          data
        )
      ),
      treeBuilder(
        assignClassToElement(createElement('div'), 'centered'), [
          createButtonNode('Refresh', refreshAction),
          createButtonNode('Clear', clearAction)
        ]
      )
    ]
  );
};

export {
  noDataUI,
  dataUI
};
