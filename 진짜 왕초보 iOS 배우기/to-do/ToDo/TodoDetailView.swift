import SwiftUI

struct TodoDetailView: View {
  @State var todo: Todo
  var body: some View {
    VStack {
      TextField("투두 타이틀", text: $todo.title)
        .font(.title2)
        .padding(5)
        .overlay(
          RoundedRectangle(cornerRadius: 8)
            .stroke(Color.gray, lineWidth: 2)
        )
      TextEditor(text: $todo.detail)
        .overlay(
          RoundedRectangle(cornerRadius: 8)
            .stroke(Color.gray, lineWidth: 2)
        )
    }
    .padding()
    .navigationTitle("📝 Edit Task")
  }
}

#Preview {
  TodoDetailView(todo: Todo(title: "프리뷰"))
}
