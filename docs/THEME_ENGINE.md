# Storefront Theme Engine

## Purpose

The Theme Studio is a client-presentation layer for comparing complete art directions on the live storefront. It changes semantic design tokens—not individual components—and saves the selected theme in browser storage under `lbi-store-theme-v1`.

Open the floating **Theme Studio** control on any storefront route. Administration routes deliberately ignore storefront themes.

## Palette contract

Every theme defines the same eight roles:

| Role | Responsibility |
| --- | --- |
| Primary | Navigation, hero fields, footer and dominant brand colour |
| Secondary | Depth, gradients, product stages and supporting dark fields |
| Accent | Primary actions, highlights, focus and selection states |
| Accent Soft | Hover states, soft highlights and luminous detail |
| Background | Main page/editorial canvas |
| Surface | Cards, forms and elevated content areas |
| Text | High-emphasis typography on light surfaces |
| Muted | Descriptions, labels and supporting information |

## Curated themes

### 01 — Royal Heritage

Premium classic direction for luxury fashion and private-label launches.

| Primary | Secondary | Accent | Accent Soft | Background | Surface | Text | Muted |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `#07162F` | `#112B54` | `#C9A45D` | `#E0C887` | `#F6F3EC` | `#FFFDF8` | `#07162F` | `#6B7687` |

### 02 — Executive Ivory

Enterprise-luxury direction for distributor presentations and premium B2B buyers.

| Primary | Secondary | Accent | Accent Soft | Background | Surface | Text | Muted |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `#10233F` | `#35536F` | `#B97943` | `#D8A171` | `#F7F3EA` | `#FFFEFB` | `#172231` | `#667383` |

### 03 — Noir Atelier

Cinematic monochrome direction for editorial drops and evening collections.

| Primary | Secondary | Accent | Accent Soft | Background | Surface | Text | Muted |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `#090A0C` | `#202329` | `#BFC2C7` | `#E1E2E4` | `#E9E9E7` | `#F8F8F6` | `#111216` | `#6F7278` |

### 04 — Cyber Luxe

Future-premium direction for digital-first launches and innovation stories.

| Primary | Secondary | Accent | Accent Soft | Background | Surface | Text | Muted |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `#070B17` | `#111C35` | `#31D7E8` | `#9D7BFF` | `#EEF2F7` | `#F9FBFF` | `#0C1426` | `#65738A` |

### 05 — Emerald Estate

Heritage-modern direction for leather goods, festive tailoring and craft stories.

| Primary | Secondary | Accent | Accent Soft | Background | Surface | Text | Muted |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `#0D2B24` | `#1E4A3D` | `#B79552` | `#D0B879` | `#F3EFE3` | `#FBF9F2` | `#11241F` | `#68776F` |

### 06 — Burgundy Reserve

Warm premium direction for wedding edits, festive campaigns and gifting.

| Primary | Secondary | Accent | Accent Soft | Background | Surface | Text | Muted |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `#3A111B` | `#6A2636` | `#C8A56A` | `#E0C095` | `#F5EEEA` | `#FFF9F5` | `#2B151A` | `#7A696D` |

### 07 — Arctic Minimal

Modern-minimal direction for product-led catalogues and international buyers.

| Primary | Secondary | Accent | Accent Soft | Background | Surface | Text | Muted |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `#172332` | `#365A75` | `#79AFC6` | `#BBD9E4` | `#F4F7F8` | `#FFFFFF` | `#172332` | `#6F7D87` |

### 08 — Terracotta Gallery

Art-directed palette for artisan narratives, creative campaigns and seasonal edits.

| Primary | Secondary | Accent | Accent Soft | Background | Surface | Text | Muted |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `#25201E` | `#7E493B` | `#C47055` | `#DDA98D` | `#F1E9DE` | `#FBF7F1` | `#2A2320` | `#786C66` |

## Database integration path

Store only the selected theme ID against the tenant/store configuration, for example `store.theme_id = "noir-atelier"`. Keep the canonical palette definitions in versioned application configuration or a managed theme table. A future admin setting should validate IDs against the theme registry, update the store record, and invalidate the storefront cache. Custom client palettes can later use the same eight-role contract.
