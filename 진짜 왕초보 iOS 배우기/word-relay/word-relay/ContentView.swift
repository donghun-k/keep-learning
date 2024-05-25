//
//  ContentView.swift
//  word-relay
//
//  Created by DorMon on 5/26/24.
//

import SwiftUI

struct ContentView: View {
  let TITLE: String = "끝말잇기 게임"
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
      Spacer()
    }
  }
}

#Preview {
  ContentView()
}
