import SwiftUI

struct ContentView: View {
  let TITLE: String = "끝말잇기 게임"
  @State var nextWord: String = ""

  var body: some View {
    VStack {
      Text(TITLE)
        .font(.title)
        .bold()
        .padding(.vertical, 16)
        .padding(.horizontal, 20)
        .background(
          RoundedRectangle(cornerRadius: 15)
            .fill(Color.teal)
            .opacity(0.2)
            .shadow(radius: 5)
        )
        .padding(.top, 10)
      TextField("단어를 입력하세요", text: $nextWord)
      Spacer()
    }
  }
}

#Preview {
  ContentView()
}
