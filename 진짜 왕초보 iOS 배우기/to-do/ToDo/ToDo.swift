import Foundation

@Observable
class Todo: Identifiable {
  var id: UUID
  var title: String
  var isCompleted: Bool
  var description: String

  init(title: String) {
    self.id = UUID()
    self.title = title
    self.isCompleted = false
    self.description = ""
  }
}
