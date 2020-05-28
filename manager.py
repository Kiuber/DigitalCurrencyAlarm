from cpbox.tool import functocli
from cpbox.tool import template
from cpbox.tool import dockerutil
from cpbox.app.devops import DevOpsApp


APP_NAME = 'digital-currency-alarm'


class App(DevOpsApp):

    def __init__(self):
        DevOpsApp.__init__(self, APP_NAME)

    def install_dependencies(self):
        cmd = 'npm install'
        self.shell_run(cmd)

        cmd = 'npm install -g supervisor@0.12.0 typescript@3.9.3'
        self.shell_run(cmd)

    def run(self):
        cmd = 'npm run server'
        self.shell_run(cmd)


if __name__ == '__main__':
    functocli.run_app(App)
