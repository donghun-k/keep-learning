import SwiftUI

struct ContentView: View {
  var body: some View {
    NavigationStack {
      List {
        HStack {
          Image(systemName: "circle")
            .foregroundColor(Color.pink)
          NavigationLink {
            Text("다음 화면입니다.")
          } label: {
            Text("투두1")
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
