FROM ubuntu:18.04

# Copy from the current directory into container
COPY . /app
RUN apt-get update && \
    apt-get install -y ruby-full build-essential zlib1g-dev
RUN gem install jekyll
RUN ["chmod", "+x", "/app/bundler_install.sh"]
RUN cd /app && ./bundler_install.sh
RUN cd /app && bundle install

EXPOSE 4000
CMD cd /app && bundle exec jekyll serve