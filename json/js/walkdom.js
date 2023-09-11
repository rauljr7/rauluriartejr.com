window.jsonArr = [];

var nestedElems = function (parentEl, pJsonObj) {
  for (let childElem of parentEl.children) {
    console.log(childElem);

    var jsonObj = {
      nested: false,
      element: {
        type: "",
        attributes: {},
        inner_html: false,
        html: null,
      },
      nested_elements: null,
    };

    var nodeName = childElem.nodeName.toLowerCase();
    var attributesMap = childElem.attributes;
    var element = {
      type: nodeName,
      attributes: {},
      inner_html: false,
      html: null,
    };
    Array.prototype.slice.call(attributesMap).forEach(function (item) {
      //console.log(item.name + ': '+ item.value);
      element.attributes[item.name] = item.value;
    });

    if (
      childElem.firstChild &&
      childElem.firstChild.nodeType === Node.TEXT_NODE
    ) {
      if (childElem.firstChild.nodeValue.trim() !== "") {
        console.log(childElem.firstChild.nodeValue.trim());

        element.inner_html = true;
        element.html = childElem.firstChild.nodeValue.trim();
      }
    }

    if (childElem.children.length > 0) {
      var nested = true;
      var nested_elements = [];
    } else {
      var nested = false;
      var nested_elements = null;
    }

    jsonObj.nested = nested;
    jsonObj.element = element;
    jsonObj.nested_elements = nested_elements;

    pJsonObj.nested_elements.push(jsonObj);

    nestedElems(childElem, jsonObj);
  }
};

var walkdomTree = function (el) {
  for (let elem of el.children) {
    console.log(elem);

    var jsonObj = {
      nested: false,
      element: {
        type: "",
        attributes: {},
        inner_html: false,
        html: null,
      },
      nested_elements: null,
    };

    var nodeName = elem.nodeName.toLowerCase();
    var attributesMap = elem.attributes;
    var element = {
      type: nodeName,
      attributes: {},
      inner_html: false,
      html: null,
    };
    Array.prototype.slice.call(attributesMap).forEach(function (item) {
      //console.log(item.name + ': '+ item.value);
      element.attributes[item.name] = item.value;
    });

    if (elem.firstChild && elem.firstChild.nodeType === Node.TEXT_NODE) {
      if (elem.firstChild.nodeValue.trim() !== "") {
        console.log(elem.firstChild.nodeValue.trim());

        element.inner_html = true;
        element.html = elem.firstChild.nodeValue.trim();
      }
    }

    if (elem.children.length > 0) {
      var nested = true;
      var nested_elements = [];
    } else {
      var nested = false;
      var nested_elements = null;
    }

    jsonObj.nested = nested;
    jsonObj.element = element;
    jsonObj.nested_elements = nested_elements;

    nestedElems(elem, jsonObj);

    window.jsonArr.push(jsonObj);
  }
  document.getElementById("res").innerHTML = JSON.stringify(window.jsonArr);
  window.jsonArr = [];
};

walkdomTree(document.getElementById("app"));

console.log(window.jsonArr);
console.log(JSON.stringify(window.jsonArr));
