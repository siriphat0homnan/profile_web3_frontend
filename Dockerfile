FROM node:19-alpine AS deps

WORKDIR /app
COPY package.json yarn.lock ./
RUN npm install -g npm
RUN apk add --update --no-cache python3 build-base gcc && ln -sf /usr/bin/python3 /usr/bin/python
RUN yarn install


FROM node:19-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

EXPOSE 3000

# Production image, copy all the files and run next
# FROM node:19-alpine AS runner
FROM node:19-alpine
WORKDIR /app

ENV NODE_ENV production


# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pages ./pages
COPY --from=builder /app/styles ./styles
COPY --from=builder /app/abi ./abi
COPY --from=builder /app/components ./components
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules


EXPOSE 3000

ENV PORT 3000

CMD ["yarn","start"]