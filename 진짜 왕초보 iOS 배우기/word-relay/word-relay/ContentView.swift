import SwiftUI

struct ContentView: View {
  let TITLE: String = "끝말잇기 게임"
  @State var words: [String] = ["Apple"]
  @State var nextWord: String = ""

  @State var showAlert: Bool = false

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
            if words.last?.last?.lowercased() == nextWord.first?.lowercased() {
              words.append(nextWord)
            } else {
              showAlert = true
            }
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
        .alert("끝말이 이어지는 단어를 입력해주세요.", isPresented: $showAlert) {
          Button("확인", role: .cancel) {
            showAlert = false
          }
        }
      }
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

#Preview {
  ContentView()
}
