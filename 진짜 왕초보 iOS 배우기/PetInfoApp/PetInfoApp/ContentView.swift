//
//  ContentView.swift
//  PetInfoApp
//
//  Created by DorMon on 5/21/24.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
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

    }
}

#Preview {
    ContentView()
}
