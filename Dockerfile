FROM debian:stretch


RUN apt-get update \
    && apt-get install openssl -y \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /var/lib/apt/lists/partial/*


ARG APP_HOME=/home/blog


COPY _build/prod/rel/blog $APP_HOME


WORKDIR $APP_HOME


ENV LANG=C.UTF-8
ENV PATH="$APP_HOME/bin:$PATH"


EXPOSE 4000


ENTRYPOINT [ "blog", "start" ]
