# Require any additional compass plugins here.
require 'susy'
require 'toolkit'
require 'respond-to'

# Output extra info for sourcemaps, now you see the scss info in the inspector.
sass_options = (environment == :development) ? { :debug_info => true } : {}
# Don't default to DEV settings. Instead, use "compass compile -e development" (defaults to production output)

# Set this to the root of your project when deployed:
http_path = "/sites/all/themes/wundertheme/"
css_dir = "stylesheets"
sass_dir = "sass"
images_dir = "images"
javascripts_dir = "js"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = (environment == :development) ? :expanded : :expanded

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
