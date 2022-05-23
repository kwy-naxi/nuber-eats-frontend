import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { Login } from "../login";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { render, waitFor } from "@testing-library/react";

describe("<Login />", () => {
  beforeEach(async () => {
    it("should render OK", async () => {
      await waitFor(() => {
        const mockedClient = createMockClient();
        render(
          <HelmetProvider>
            <BrowserRouter>
              <ApolloProvider client={mockedClient}>
                <Login />
              </ApolloProvider>
            </BrowserRouter>
          </HelmetProvider>
        );
      });
    });

    it("should render OK", async () => {
      await waitFor(() => {
        expect(document.title).toBe("Login | Nuber Eats");
      });
    });
  });
});
