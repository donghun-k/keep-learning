import SwiftUI

struct ContentView: View {
  @State var todoList: [Todo] = [
    Todo(title: "공부"),
    Todo(title: "영화")
  ]

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
            }
          }
        }
      }
      .navigationTitle("ToDo 📋")
    }
  }
}

#Preview {
  ContentView()
}
