import SwiftUI

struct ContentView: View {
  var body: some View {
    VStack {
      HStack {
        Image("dogProfile")
          .resizable()
          .frame(width: 120, height: 120)
          .clipShape(/*@START_MENU_TOKEN@*/Circle()/*@END_MENU_TOKEN@*/)
          .overlay(
            Circle()
              .stroke(Color.teal,
                      lineWidth: 3)
          )
        VStack(alignment: .leading) {
          Text("이름: 멍뭉이")
          Text("시바견")
          Text("2024년 12월생")
        }
        .font(.system(size: 20))
        .padding(.leading, 20)
      }
      .padding(.bottom, 20)
      VStack(alignment: .leading, spacing: 10) {
        Text("좋아하는 것")
          .font(.system(size: 20))
          .bold()
        Divider()
        Text(" - 햄버거")
        Text(" - 토끼")
      }
      .padding()
      .background(
        RoundedRectangle(cornerRadius: 15)
          .fill(Color.mint)
          .opacity(0.2)
          .shadow(radius: 5)
      )
      VStack(alignment: .leading, spacing: 10) {
        Text("스킬")
          .font(.system(size: 20))
          .bold()
        Divider()
        Text(" - 울기")
        Text(" - 안아주기")
      }
      .padding()
      .background(
        RoundedRectangle(cornerRadius: 15)
          .fill(Color.pink)
          .opacity(0.2)
          .shadow(radius: 5)
      )
    }
    .padding()
  }
}

#Preview {
  ContentView()
}
