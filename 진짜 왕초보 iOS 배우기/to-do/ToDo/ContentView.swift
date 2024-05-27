import SwiftUI

struct ContentView: View {
  
  var todoList: [Todo] = [
    Todo(title: "공부"),
    Todo(title: "영화")
  ]
  
  var body: some View {
    NavigationStack {
      List {
        ForEach(todoList) { todo in
          HStack {
            Image(systemName: "circle")
              .foregroundColor(Color.pink)
            NavigationLink {
              Text(todo.description)
            } label: {
              Text(todo.title)
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
