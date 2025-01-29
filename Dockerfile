# Base Image
FROM node:20-alpine AS node_image
WORKDIR /app

## Build Image
FROM node_image as build_image
COPY .npmrc package*.json ./

RUN npm install

COPY ./app ./app
COPY ./constants ./constants
COPY ./graphql ./graphql
COPY ./styles ./styles
COPY ./config ./config
COPY ./components ./components
COPY ./public ./public
COPY ./next.config.js ./
COPY ./tsconfig.json ./
COPY ./postcss.config.mjs ./
COPY ./tailwind.config.ts ./

RUN npm run build

## Runtime Dependencies
FROM build_image as dependencies
RUN npm install --omit dev

## Final Image
FROM node_image as final_image

# Add non-root user
RUN addgroup -S dgroup && adduser -S duser -G dgroup
# Update the system
RUN apk --no-cache -U upgrade

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build_image /app/next.config.js ./
COPY --from=build_image /app/public ./public
COPY --from=build_image /app/.next ./.next

EXPOSE 4000
ENV PORT 4000
ENV NEXT_PUBLIC_API_URL brighte-eats-api

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_OPTIONS --max-http-header-size=32768

CMD npx next start
