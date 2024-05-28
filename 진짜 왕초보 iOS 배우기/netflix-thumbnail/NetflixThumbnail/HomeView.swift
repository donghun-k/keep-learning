import SwiftUI

struct HomeView: View {
  var body: some View {
    ScrollView {
      HStack {
        Image("logo")
          .resizable()
          .frame(width: 50, height: 50)
          .padding()
        Spacer()
        Image(systemName: "magnifyingglass")
          .resizable()
          .frame(width: 50, height: 50)
          .padding()
      }
    }
    .background(.black)
    .foregroundStyle(.white)
  }
}

#Preview {
  HomeView()
}
