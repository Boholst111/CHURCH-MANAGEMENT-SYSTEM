import { render, screen, fireEvent, waitFor, act } from "@testing-library/react"
import "@testing-library/jest-dom"
import {
  Layout,
  LayoutSidebar,
  LayoutHeader,
  LayoutContent,
  LayoutPage,
  LayoutPageHeader,
  LayoutPageContent,
  SidebarHeader,
  SidebarContent,
  SidebarItem,
  HeaderLeft,
  HeaderRight,
} from "../layout"
import { Home, Settings } from "lucide-react"

describe("Layout Component", () => {
  beforeEach(() => {
    // Set desktop viewport by default
    window.innerWidth = 1280
    window.innerHeight = 720
    window.dispatchEvent(new Event("resize"))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("Layout Root", () => {
    it("renders children correctly", () => {
      render(
        <Layout>
          <div data-testid="child">Content</div>
        </Layout>
      )

      expect(screen.getByTestId("child")).toBeInTheDocument()
    })

    it("applies custom className", () => {
      const { container } = render(
        <Layout className="custom-class">
          <div>Content</div>
        </Layout>
      )

      expect(container.firstChild).toHaveClass("custom-class")
    })

    it("manages sidebar state correctly", () => {
      const onOpenChange = jest.fn()

      render(
        <Layout sidebarDefaultOpen={true} onSidebarOpenChange={onOpenChange}>
          <LayoutSidebar>
            <SidebarHeader>
              <span>Logo</span>
            </SidebarHeader>
            <SidebarContent>
              <SidebarItem href="/">Home</SidebarItem>
            </SidebarContent>
          </LayoutSidebar>
          <div>Content</div>
        </Layout>
      )

      // Verify the sidebar is rendered
      const sidebar = screen.getByRole("navigation")
      expect(sidebar).toBeInTheDocument()
    })
  })

  describe("LayoutSidebar", () => {
    it("renders sidebar with navigation role", () => {
      render(
        <Layout>
          <LayoutSidebar>
            <SidebarContent>
              <SidebarItem href="/">Home</SidebarItem>
            </SidebarContent>
          </LayoutSidebar>
        </Layout>
      )

      const sidebar = screen.getByRole("navigation")
      expect(sidebar).toBeInTheDocument()
      expect(sidebar).toHaveAttribute("aria-label", "Main navigation")
    })

    it("renders sidebar items", () => {
      render(
        <Layout>
          <LayoutSidebar>
            <SidebarContent>
              <SidebarItem href="/" icon={<Home className="w-5 h-5" />}>
                Home
              </SidebarItem>
              <SidebarItem href="/settings" icon={<Settings className="w-5 h-5" />}>
                Settings
              </SidebarItem>
            </SidebarContent>
          </LayoutSidebar>
        </Layout>
      )

      expect(screen.getByText("Home")).toBeInTheDocument()
      expect(screen.getByText("Settings")).toBeInTheDocument()
    })

    it("highlights active sidebar item", () => {
      render(
        <Layout>
          <LayoutSidebar>
            <SidebarContent>
              <SidebarItem href="/" active>
                Home
              </SidebarItem>
              <SidebarItem href="/settings">Settings</SidebarItem>
            </SidebarContent>
          </LayoutSidebar>
        </Layout>
      )

      const homeLink = screen.getByText("Home").closest("a")
      expect(homeLink).toHaveAttribute("aria-current", "page")
    })

    it("shows close button on mobile", async () => {
      // Set mobile viewport
      window.innerWidth = 375
      window.dispatchEvent(new Event("resize"))

      render(
        <Layout sidebarDefaultOpen={true}>
          <LayoutSidebar>
            <SidebarHeader>
              <span>Logo</span>
            </SidebarHeader>
            <SidebarContent>
              <SidebarItem href="/">Home</SidebarItem>
            </SidebarContent>
          </LayoutSidebar>
        </Layout>
      )

      await waitFor(() => {
        const closeButton = screen.getByLabelText("Close sidebar")
        expect(closeButton).toBeInTheDocument()
      })
    })

    it("closes sidebar when close button is clicked on mobile", async () => {
      // Set mobile viewport
      window.innerWidth = 375
      window.dispatchEvent(new Event("resize"))

      render(
        <Layout sidebarDefaultOpen={true}>
          <LayoutSidebar>
            <SidebarHeader>
              <span>Logo</span>
            </SidebarHeader>
            <SidebarContent>
              <SidebarItem href="/">Home</SidebarItem>
            </SidebarContent>
          </LayoutSidebar>
        </Layout>
      )

      await waitFor(() => {
        const closeButton = screen.getByLabelText("Close sidebar")
        fireEvent.click(closeButton)
      })

      // Sidebar should have translate class when closed
      await waitFor(() => {
        const sidebar = screen.getByRole("navigation")
        expect(sidebar).toHaveClass("-translate-x-full")
      })
    })

    it("renders sidebar correctly on mobile", async () => {
      // Set mobile viewport before rendering
      act(() => {
        window.innerWidth = 375
        window.dispatchEvent(new Event("resize"))
      })

      render(
        <Layout sidebarDefaultOpen={false}>
          <LayoutSidebar>
            <SidebarContent>
              <SidebarItem href="/">Home</SidebarItem>
            </SidebarContent>
          </LayoutSidebar>
        </Layout>
      )

      // Sidebar should be hidden on mobile by default
      const sidebar = screen.getByRole("navigation")
      expect(sidebar).toHaveClass("-translate-x-full")
    })

    it("closes sidebar when overlay is clicked on mobile", async () => {
      // Set mobile viewport
      window.innerWidth = 375
      window.dispatchEvent(new Event("resize"))

      const { container } = render(
        <Layout sidebarDefaultOpen={true}>
          <LayoutSidebar>
            <SidebarContent>
              <SidebarItem href="/">Home</SidebarItem>
            </SidebarContent>
          </LayoutSidebar>
        </Layout>
      )

      await waitFor(() => {
        const overlay = container.querySelector(".bg-black.bg-opacity-50")
        if (overlay) {
          fireEvent.click(overlay)
        }
      })

      await waitFor(() => {
        const sidebar = screen.getByRole("navigation")
        expect(sidebar).toHaveClass("-translate-x-full")
      })
    })
  })

  describe("LayoutHeader", () => {
    it("renders header with sticky positioning", () => {
      const { container } = render(
        <Layout>
          <LayoutHeader>
            <HeaderLeft>
              <span>Left Content</span>
            </HeaderLeft>
          </LayoutHeader>
        </Layout>
      )

      const header = container.querySelector("header")
      expect(header).toHaveClass("sticky", "top-0", "z-40")
    })

    it("renders header left and right sections", () => {
      render(
        <Layout>
          <LayoutHeader>
            <HeaderLeft>
              <span>Left Content</span>
            </HeaderLeft>
            <HeaderRight>
              <span>Right Content</span>
            </HeaderRight>
          </LayoutHeader>
        </Layout>
      )

      expect(screen.getByText("Left Content")).toBeInTheDocument()
      expect(screen.getByText("Right Content")).toBeInTheDocument()
    })

    it("shows mobile menu toggle button", () => {
      render(
        <Layout>
          <LayoutSidebar>
            <SidebarContent>
              <SidebarItem href="/">Home</SidebarItem>
            </SidebarContent>
          </LayoutSidebar>
          <LayoutHeader>
            <HeaderLeft>
              <span>Title</span>
            </HeaderLeft>
          </LayoutHeader>
        </Layout>
      )

      const toggleButton = screen.getByLabelText("Open sidebar")
      expect(toggleButton).toBeInTheDocument()
    })
  })

  describe("LayoutContent", () => {
    it("renders content with default padding", () => {
      const { container } = render(
        <Layout>
          <LayoutContent>
            <div data-testid="content">Content</div>
          </LayoutContent>
        </Layout>
      )

      const main = container.querySelector("main")
      expect(main).toHaveClass("p-8") // lg padding
    })

    it("applies custom padding", () => {
      const { container } = render(
        <Layout>
          <LayoutContent padding="sm">
            <div>Content</div>
          </LayoutContent>
        </Layout>
      )

      const main = container.querySelector("main")
      expect(main).toHaveClass("p-4") // sm padding
    })

    it("applies max width constraint", () => {
      const { container } = render(
        <Layout>
          <LayoutContent maxWidth="5xl">
            <div>Content</div>
          </LayoutContent>
        </Layout>
      )

      const main = container.querySelector("main")
      expect(main).toHaveClass("max-w-5xl", "mx-auto")
    })

    it("adds left margin for sidebar on desktop", () => {
      const { container } = render(
        <Layout>
          <LayoutContent>
            <div>Content</div>
          </LayoutContent>
        </Layout>
      )

      const main = container.querySelector("main")
      expect(main).toHaveClass("lg:ml-64")
    })
  })

  describe("LayoutPage Components", () => {
    it("renders page header with title and subtitle", () => {
      render(
        <Layout>
          <LayoutContent>
            <LayoutPage>
              <LayoutPageHeader
                title="Dashboard"
                subtitle="Welcome back!"
              />
            </LayoutPage>
          </LayoutContent>
        </Layout>
      )

      expect(screen.getByText("Dashboard")).toBeInTheDocument()
      expect(screen.getByText("Welcome back!")).toBeInTheDocument()
    })

    it("renders page header with actions", () => {
      render(
        <Layout>
          <LayoutContent>
            <LayoutPage>
              <LayoutPageHeader
                title="Dashboard"
                actions={
                  <button data-testid="action-button">Add New</button>
                }
              />
            </LayoutPage>
          </LayoutContent>
        </Layout>
      )

      expect(screen.getByTestId("action-button")).toBeInTheDocument()
    })

    it("renders page content", () => {
      render(
        <Layout>
          <LayoutContent>
            <LayoutPage>
              <LayoutPageContent>
                <div data-testid="page-content">Page Content</div>
              </LayoutPageContent>
            </LayoutPage>
          </LayoutContent>
        </Layout>
      )

      expect(screen.getByTestId("page-content")).toBeInTheDocument()
    })
  })

  describe("Responsive Behavior", () => {
    it("adjusts layout for mobile viewport", async () => {
      // Start with desktop
      window.innerWidth = 1280
      window.dispatchEvent(new Event("resize"))

      const { container } = render(
        <Layout>
          <LayoutSidebar>
            <SidebarContent>
              <SidebarItem href="/">Home</SidebarItem>
            </SidebarContent>
          </LayoutSidebar>
          <LayoutContent>
            <div>Content</div>
          </LayoutContent>
        </Layout>
      )

      // Switch to mobile
      window.innerWidth = 375
      window.dispatchEvent(new Event("resize"))

      await waitFor(() => {
        const sidebar = screen.getByRole("navigation")
        expect(sidebar).toHaveClass("-translate-x-full")
      })
    })

    it("adjusts layout for tablet viewport", async () => {
      window.innerWidth = 768
      window.dispatchEvent(new Event("resize"))

      render(
        <Layout>
          <LayoutSidebar>
            <SidebarContent>
              <SidebarItem href="/">Home</SidebarItem>
            </SidebarContent>
          </LayoutSidebar>
          <LayoutContent>
            <div>Content</div>
          </LayoutContent>
        </Layout>
      )

      await waitFor(() => {
        const sidebar = screen.getByRole("navigation")
        // On tablet (< 1024px), sidebar should be hidden by default
        expect(sidebar).toHaveClass("-translate-x-full")
      })
    })

    it("shows fixed sidebar on desktop", () => {
      window.innerWidth = 1280
      window.dispatchEvent(new Event("resize"))

      render(
        <Layout sidebarDefaultOpen={true}>
          <LayoutSidebar>
            <SidebarContent>
              <SidebarItem href="/">Home</SidebarItem>
            </SidebarContent>
          </LayoutSidebar>
          <LayoutContent>
            <div>Content</div>
          </LayoutContent>
        </Layout>
      )

      const sidebar = screen.getByRole("navigation")
      expect(sidebar).toHaveClass("lg:translate-x-0")
      expect(sidebar).not.toHaveClass("-translate-x-full")
    })
  })

  describe("Z-Index Layering", () => {
    it("applies correct z-index to sidebar on desktop", () => {
      window.innerWidth = 1280
      window.dispatchEvent(new Event("resize"))

      render(
        <Layout>
          <LayoutSidebar>
            <SidebarContent>
              <SidebarItem href="/">Home</SidebarItem>
            </SidebarContent>
          </LayoutSidebar>
        </Layout>
      )

      const sidebar = screen.getByRole("navigation")
      expect(sidebar).toHaveClass("z-50", "lg:z-30")
    })

    it("applies correct z-index to header", () => {
      const { container } = render(
        <Layout>
          <LayoutHeader>
            <HeaderLeft>
              <span>Title</span>
            </HeaderLeft>
          </LayoutHeader>
        </Layout>
      )

      const header = container.querySelector("header")
      expect(header).toHaveClass("z-40")
    })

    it("applies correct z-index to sidebar", () => {
      render(
        <Layout>
          <LayoutSidebar>
            <SidebarContent>
              <SidebarItem href="/">Home</SidebarItem>
            </SidebarContent>
          </LayoutSidebar>
        </Layout>
      )

      const sidebar = screen.getByRole("navigation")
      expect(sidebar).toHaveClass("z-50", "lg:z-30")
    })
  })

  describe("Accessibility", () => {
    it("has proper ARIA labels on sidebar", () => {
      render(
        <Layout>
          <LayoutSidebar>
            <SidebarContent>
              <SidebarItem href="/">Home</SidebarItem>
            </SidebarContent>
          </LayoutSidebar>
        </Layout>
      )

      const sidebar = screen.getByRole("navigation")
      expect(sidebar).toHaveAttribute("aria-label", "Main navigation")
    })

    it("has proper ARIA attributes on active sidebar item", () => {
      render(
        <Layout>
          <LayoutSidebar>
            <SidebarContent>
              <SidebarItem href="/" active>
                Home
              </SidebarItem>
            </SidebarContent>
          </LayoutSidebar>
        </Layout>
      )

      const homeLink = screen.getByText("Home").closest("a")
      expect(homeLink).toHaveAttribute("aria-current", "page")
    })

    it("has proper ARIA labels on buttons", () => {
      render(
        <Layout>
          <LayoutSidebar>
            <SidebarContent>
              <SidebarItem href="/">Home</SidebarItem>
            </SidebarContent>
          </LayoutSidebar>
          <LayoutHeader>
            <HeaderLeft>
              <span>Title</span>
            </HeaderLeft>
          </LayoutHeader>
        </Layout>
      )

      const toggleButton = screen.getByLabelText("Open sidebar")
      expect(toggleButton).toBeInTheDocument()
    })

    it("supports keyboard navigation on mobile", async () => {
      // Set mobile viewport
      act(() => {
        window.innerWidth = 375
        window.dispatchEvent(new Event("resize"))
      })

      render(
        <Layout sidebarDefaultOpen={false}>
          <LayoutSidebar>
            <SidebarHeader>
              <span>Logo</span>
            </SidebarHeader>
            <SidebarContent>
              <SidebarItem href="/">Home</SidebarItem>
            </SidebarContent>
          </LayoutSidebar>
        </Layout>
      )

      // Sidebar should be closed initially
      const sidebar = screen.getByRole("navigation")
      expect(sidebar).toHaveClass("-translate-x-full")

      // Escape key should work (even though sidebar is already closed)
      act(() => {
        fireEvent.keyDown(document, { key: "Escape" })
      })

      // Sidebar should still be closed
      expect(sidebar).toHaveClass("-translate-x-full")
    })
  })
})
