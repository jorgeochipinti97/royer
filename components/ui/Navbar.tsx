import { useContext, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";

import { CartContext, UiContext } from "../../context";
import { useProducts } from "../../hooks";
import Cookie from "js-cookie";

export const Navbar = () => {
  const { asPath, push } = useRouter();
  const { toggleSideMenu } = useContext(UiContext);
  const { numberOfItems } = useContext(CartContext);
  const { isLoading } = useProducts("/products");

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push("/search");
  };

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Royer |</Typography>
            <Typography sx={{ ml: 0.5 }}>Store</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        {!isLoading && (
          <Box
            sx={{
              display: isSearchVisible ? "none" : { xs: "none", sm: "block" },
            }}
            className="fadeIn"
          >
            <NextLink href="/" passHref>
              <Link>
                <Button color={asPath === "/" ? "primary" : "info"}>
                  Home
                </Button>
              </Link>
            </NextLink>
            <NextLink href="/products" passHref>
              <Link>
                <Button color={asPath === "/products" ? "primary" : "info"}>
                  Products
                </Button>
              </Link>
            </NextLink>
            <NextLink href="/find" passHref>
              <Link>
                <Button color={asPath === "/find" ? "primary" : "info"}>
                  Find My Order
                </Button>
              </Link>
            </NextLink>
            <NextLink href="/contact" passHref>
              <Link>
                <Button color={asPath === "/contact" ? "primary" : "info"}>
                  Contact Us
                </Button>
              </Link>
            </NextLink>
            <NextLink href="/faqs" passHref>
              <Link>
                <Button color={asPath === "/faqs" ? "primary" : "info"}>
                  FAQS
                </Button>
              </Link>
            </NextLink>
          </Box>
        )}
        <Box flex={1} />

        {/* Pantallas pantallas grandes */}
        <Box
          sx={{
            display:
              asPath.includes("search") || asPath.includes("products")
                ? "none"
                : "",
          }}
        >
          {/* {
                        isSearchVisible
                            ? (
                                <Input
                                    sx={{ display: { xs: 'none', sm: 'flex' } }}
                                    className='fadeIn'
                                    autoFocus
                                    value={searchTerm}
                                    onChange={(e) => Cookie.set('searchTerm', e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                                    type='text'
                                    placeholder="Search..."
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setIsSearchVisible(false)}
                                            >
                                                <ClearOutlined />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            )
                            :
                            (
                                <IconButton
                                    onClick={() => setIsSearchVisible(true)}
                                    className="fadeIn"
                                    sx={{ display: { xs: 'none', sm: 'flex' } }}
                                >
                                    <SearchOutlined />
                                </IconButton>
                            )
                    } */}
        </Box>

        {/* Pantallas pequeñas */}
        {/* <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={ toggleSideMenu }
                >
                    <SearchOutlined />
                </IconButton> */}

        <NextLink href="/cart" passHref>
          <Link>
            <Box display="flex" justifyContent="center">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <IconButton>
                  <Badge
                    badgeContent={numberOfItems > 9 ? "+9" : numberOfItems}
                    color={numberOfItems >= 3 ? "success" : "secondary"}
                  >
                    <ShoppingCartOutlined />
                  </Badge>
                </IconButton>
              </Box>
            </Box>
          </Link>
        </NextLink>
                <Typography variant="subtitle1" sx={{ textAlign: "center",color:'black' }}>
                  {numberOfItems >= 3 && "10% OFF"}
                </Typography>

        <Button onClick={toggleSideMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
