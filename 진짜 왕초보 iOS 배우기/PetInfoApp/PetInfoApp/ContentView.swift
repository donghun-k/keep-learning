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
          Text("누렁이")
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

      ScrollView(.horizontal) {
        HStack {
          Image("dog1")
            .resizable()
            .frame(width: 160, height: 160)
            .overlay(Rectangle().stroke(Color.mint, lineWidth: 4))
          Image("dog2")
            .resizable()
            .frame(width: 160, height: 160)
            .overlay(Rectangle().stroke(Color.blue, lineWidth: 4))
          Image("dog3")
            .resizable()
            .frame(width: 160, height: 160)
            .overlay(Rectangle().stroke(Color.yellow, lineWidth: 4))
        }
        .padding()
        .background(
          RoundedRectangle(cornerRadius: 15)
            .fill(Color.yellow)
            .opacity(0.2)
            .shadow(radius: 5)
        )
      }
      .scrollIndicators(.hidden)
    }
    .padding()
  }
}

#Preview {
  ContentView()
}
