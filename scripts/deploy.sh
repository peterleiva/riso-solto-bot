###
#
# Deploy the application using the process manager pm2
#
###

export NODE_ENV=production
ecosystem="ecosystem.config.cjs"

echo args "$@"
pm2 "$@" "$ecosystem"
