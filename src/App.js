function task(idx, content, expectedTime) {
  this.idx = idx;
  this.content = content;
  this.expectedTime = expectedTime;
}

class todoList {
  constructor(taskList) {
    this.taskList = taskList;
  }

  removeTask = (removeBtn) => {
    const table = document.getElementById("taskTable");
    const removedTask = removeBtn.closest("li");
    for (let i = 0; i < this.taskList.length; i++) {
      if (this.taskList[i].idx === Number(removedTask.id)) {
        this.taskList.splice(i, 1);
        table.removeChild(removedTask);
      }
    }
  };

  addTask = () => {
    const content = document.getElementById("content").value;
    const listItem = document.createElement("li");
    const removeBtn = document.createElement("button");
    removeBtn.innerText = "remove";
    removeBtn.addEventListener("click", () => this.removeTask(removeBtn));
    listItem.innerText = content;
    listItem.append(removeBtn);
    const table = document.getElementById("taskTable");
    table.appendChild(listItem);
    removeBtn.id = "remove-btn";
    const expectedTimeForm = document.createElement("input");
    const okTime = document.createElement("button");
    okTime.innerText = "ensure";
    okTime.id = "ensure-time";
    expectedTimeForm.id = "expectedTimeForm";
    listItem.append(expectedTimeForm);
    listItem.append(okTime);
    let expectedTime;
    const timeOutput = document.createElement("h3");
    const ensureTime = () => {
      document.getElementById("ensure-time").addEventListener("click", () => {
        expectedTime = document.getElementById("expectedTimeForm").value;
        const hour = Math.trunc(Number(expectedTime) / 60);
        const minute = Number(expectedTime) % 60;
        timeOutput.innerText = `${hour} hour ${minute} minute`;
        if (hour === 0) timeOutput.innerText = `${minute} minute`;
        if (minute === 0) timeOutput.innerText = `${hour} hour`;
        listItem.removeChild(expectedTimeForm);
        listItem.removeChild(okTime);
        this.taskList.push(
          new task(this.taskList.length, content, expectedTime)
        );
      });
      console.log(document.getElementById("taskTable"));
    };
    ensureTime();
    listItem.append(timeOutput);
    listItem.id = this.taskList.length;
    document.getElementById("content").value = "";
  };

  sortTask = () => {
    for (let i = 0; i < this.taskList.length; i++) {
      for (let j = 0; j < i; j++) {
        if (
          Number(this.taskList[i].expectedTime) <
          Number(this.taskList[j].expectedTime)
        ) {
          [this.taskList[i], this.taskList[j]] = [
            this.taskList[j],
            this.taskList[i],
          ];
        }
      }
    }
    let taskTable = document.getElementById("taskTable");
    taskTable.querySelectorAll("li").forEach((tt) => {
      taskTable.removeChild(tt);
    });
    this.taskList.forEach((sortedTask) => {
      const listSortedTask = document.createElement("li");
      const timeOutput = document.createElement("h3");
      listSortedTask.innerText = sortedTask.content;
      listSortedTask.id = sortedTask.idx;
      taskTable.append(listSortedTask);
      const hour = Math.trunc(Number(sortedTask.expectedTime) / 60);
      const minute = Number(sortedTask.expectedTime) % 60;
      timeOutput.innerText = `${hour} hour ${minute} minute`;
      if (hour === 0) timeOutput.innerText = `${minute} minute`;
      if (minute === 0) timeOutput.innerText = `${hour} hour`;
      const removeBtn = document.createElement("button");
      removeBtn.innerText = "remove";
      removeBtn.addEventListener("click", () => this.removeTask(removeBtn));
      removeBtn.id = "remove-btn";
      listSortedTask.append(removeBtn);
      listSortedTask.append(timeOutput);
      taskTable.append(listSortedTask);
    });
  };
}
App = new todoList([]);
document.getElementById("submit").addEventListener("click", App.addTask);
document.getElementById("sort").addEventListener("click", App.sortTask);
