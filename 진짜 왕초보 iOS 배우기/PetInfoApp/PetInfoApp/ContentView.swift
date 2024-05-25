import SwiftUI

struct ContentView: View {
  var body: some View {
    VStack {
      ProfileVew()
      LikesView()
      SkillView()
      PhotosView()
    }
    .padding()
  }
}

#Preview {
  ContentView()
}
