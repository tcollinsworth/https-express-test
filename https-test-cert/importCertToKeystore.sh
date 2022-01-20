keytool -import -noprompt -trustcacerts \
-alias localhost \
-file /home/troy/development/node/td-ameritrade/https-cert/server.crt \
-keystore /home/troy/java/jdk/jre/lib/security/cacerts \
-storepass changeit
