
Vagrant.configure("2") do |config|

  config.vm.box = "bento/ubuntu-20.04"

  config.ssh.username = "vagrant"
  config.ssh.password = "vagrant"

  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "172.16.1.101"


  config.vm.network "private_network", ip: "172.16.1.101"




   config.vm.synced_folder ".", "/vagrant"


  # 
  # config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
  #   vb.memory = "1024"
  # end
  #


  # config.vm.provision "shell", inline: <<-SHELL
  #   apt-get update
  #   apt-get install -y apache2
  # SHELL
end
