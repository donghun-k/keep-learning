//
//  LikesView.swift
//  PetInfoApp
//
//  Created by DorMon on 5/25/24.
//

import SwiftUI

struct LikesView: View {
  var body: some View {
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
  }
}

#Preview {
  LikesView()
}
