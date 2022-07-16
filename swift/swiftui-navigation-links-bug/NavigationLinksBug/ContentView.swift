import SwiftUI

struct ButtonView: View {
  let message: String
  let buttonTitle: String
  let onTap: () -> Void

  var body: some View {
    VStack {
      Text(message).padding()

      Button(action: { onTap() }) {
        Text(buttonTitle)
      }
    }
  }
}

struct ContentView: View {
  @State private var selection: String?

  var body: some View {
    NavigationView {
      VStack {
        ButtonView(
          message: "First screen",
          buttonTitle: "Tap me!",
          onTap: { self.selection = "view-2" }
        )

        NavigationLink(
          destination: ButtonView(
            message: "Second screen",
            buttonTitle: "Tap me, again!",
            onTap: { self.selection = "view-3" }
          ),
          tag: "view-2",
          selection: self.$selection
        ) { EmptyView() }

        NavigationLink(
          destination: ButtonView(
            message: "Third screen",
            buttonTitle: "One more time...",
            onTap: { self.selection = "view-4" }
          ),
          tag: "view-3",
          selection: self.$selection
        ) { EmptyView() }

        NavigationLink(
          destination: Text("Final screen"),
          tag: "view-4",
          selection: self.$selection
        ) { EmptyView() }
      }
    }
  }
}
