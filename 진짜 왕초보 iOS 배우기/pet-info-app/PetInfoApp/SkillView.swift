//
//  SkillView.swift
//  PetInfoApp
//
//  Created by DorMon on 5/25/24.
//

import SwiftUI

struct SkillView: View {
  var body: some View {
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
}

#Preview {
  SkillView()
}
