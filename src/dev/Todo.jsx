import React from "react";
import todo from "./todo.json";

const Todo = () => {
  const itemClass = (status) => {
    switch (status) {
      case "completed":
        return "text-gray-500 line-through";
      case "in progress":
        return "text-green-500";
      default:
        return "text-gray-100";
    }
  };
  return (
    <div className="p-4 shadow-md bg-sf-dark border-2 border-blue-500">
      <h1 className="text-2xl">Dev Roadmap</h1>
      <div className="p-2 max-h-[800px] overflow-auto">
        <section className="border-t my-2 py-2">
          <h3 className="text-lg">Fixes</h3>
          <ul className="pl-4">
            {todo.fixes.map((fix, index) => (
              <li key={index} className={`pl-4 ${itemClass(fix.status)}`}>
                {fix.item}
                {fix.children && (
                  <ul className="ml-6">
                    {fix.children.map((child, childIndex) => (
                      <li
                        key={childIndex}
                        className={`pl-4 ${itemClass(child.status)}`}
                      >
                        {child.item}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
        <section className="border-t my-2 py-2">
          <h3 className="text-lg">Improvements</h3>
          <ul className="pl-4">
            {todo.improvements.map((improvement, index) => (
              <li
                key={index}
                className={`pl-4 ${itemClass(improvement.status)}`}
              >
                {improvement.item}
                {improvement.children && (
                  <ul className="ml-6">
                    {improvement.children.map((child, childIndex) => (
                      <li
                        key={childIndex}
                        className={`pl-4 ${itemClass(child.status)}`}
                      >
                        {child.item}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
        <section className="border-t my-2 py-2">
          <h3 className="text-lg">Finishes</h3>
          <ul className="pl-4">
            {todo.finishes.map((finish, index) => (
              <li key={index} className={`pl-4 ${itemClass(finish.status)}`}>
                {finish.item}
                {finish.children && (
                  <ul className="ml-6">
                    {finish.children.map((child, childIndex) => (
                      <li
                        key={childIndex}
                        className={`pl-4 ${itemClass(child.status)}`}
                      >
                        {child.item}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Todo;
