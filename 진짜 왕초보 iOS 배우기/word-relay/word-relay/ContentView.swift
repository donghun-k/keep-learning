import SwiftUI

struct ContentView: View {
  let TITLE: String = "끝말잇기 게임"
  @State var words: [String] = ["도라에몽", "몽모랑시", "시에스타"]
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
      HStack {
        TextField("단어를 입력하세요", text: $nextWord)
          .padding()
          .background(
            RoundedRectangle(cornerRadius: 10)
              .stroke(lineWidth: 2)
          )
        Button(
          action: {
            words.append(nextWord)
            nextWord = ""
          },
          label: {
            Text("확인")
              .foregroundStyle(Color.white)
              .padding(.horizontal)
              .padding(.vertical, 12)
              .background(
                RoundedRectangle(cornerRadius: 10)
              )
          }
        )
      }
      .padding(.horizontal)
      .padding(.top)
      List { ForEach(words.reversed(), id: \.self) { word in
        Text(word)
          .font(.title2)
      }

      }.listStyle(.plain)
    }
  }
}

#Preview {
  ContentView()
}
