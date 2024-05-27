import SwiftUI

struct ContentView: View {
  @State var todoList: [Todo] = [
    Todo(title: "공부"),
    Todo(title: "영화")
  ]

  func addTodo() {
    withAnimation {
      let newTodo = Todo(title: "새로운 투두")
      todoList.append(newTodo)
    }
  }

  func deleteTodo(indexSet: IndexSet) {
    withAnimation {
      for index in indexSet {
        todoList.remove(at: index)
      }
    }
  }

  var body: some View {
    NavigationStack {
      List {
        ForEach(todoList) { todo in
          HStack {
            Image(systemName: todo.isCompleted ? "circle.fill" : "circle")
              .foregroundColor(Color.pink)
              .onTapGesture {
                todo.isCompleted.toggle()
              }
            NavigationLink {
              Text(todo.description)
            } label: {
              Text(todo.title)
                .strikethrough(todo.isCompleted, color: Color.gray)
                .foregroundStyle(todo.isCompleted ? Color.gray : Color.primary)
            }
          }
          .listRowSeparator(.hidden)
        }
        .onDelete(perform: deleteTodo)
      }
      .listStyle(.plain)
      .navigationTitle("📋 To-Do")
      .toolbar {
        ToolbarItem {
          EditButton()
        }
        ToolbarItem {
          Button(
            action: addTodo, label: {
              Image(systemName: "plus")
            }
          )
        }
      }
    }
  }
}

#Preview {
  ContentView()
}
