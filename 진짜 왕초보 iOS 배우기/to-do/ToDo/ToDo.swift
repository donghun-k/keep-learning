import Foundation
import SwiftData

@Model
class Todo: Identifiable {
  var id: UUID
  var title: String
  var isCompleted: Bool
  var detail: String

  init(title: String) {
    self.id = UUID()
    self.title = title
    self.isCompleted = false
    self.detail = ""
  }
}
