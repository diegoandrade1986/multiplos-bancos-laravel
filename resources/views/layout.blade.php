<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Lab::teste</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Bootstrap 3.3.6 -->
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
    <!-- jvectormap -->
    {{--<link rel="stylesheet" href="plugins/jvectormap/jquery-jvectormap-1.2.2.css">--}}


    <!-- iCheck for checkboxes and radio inputs -->
    <link rel="stylesheet" href="{{ asset('plugins/iCheck/all.css') }}">
    {{--<link rel="stylesheet" href="{{ asset('plugins/select2/select2.min.css') }}">--}}
            <!-- Theme style -->
    <link rel="stylesheet" href="{{ asset('dist/css/AdminLTE.min.css') }}">

    {{--<link rel="stylesheet" href="{{ asset('dist/css/dataTables.tableTools.css') }}">--}}
    <!-- AdminLTE Skins. Choose a skin from the css/skins folder instead of downloading all of them to reduce the load. -->
    <link rel="stylesheet" href="{{ asset('dist/css/skins/_all-skins.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{asset('css/app.css')}}">

    @yield('css')
    {{-- favicon --}}
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body class="hold-transition skin-blue-light sidebar-mini">
<div class="wrapper">

    <header class="main-header">

        <!-- Logo -->
        <a href="/" class="logo">
            <!-- mini logo for sidebar mini 50x50 pixels -->
            <span class="logo-mini"><b>Lab</b></span>
            <!-- logo for regular state and mobile devices -->
            <span class="logo-lg"><b>Lab</b> New</span>
        </a>

        <!-- Header Navbar: style can be found in header.less -->
        <nav class="navbar navbar-static-top">
            <!-- Sidebar toggle button-->
            <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                <span class="sr-only">Toggle navigation</span>
            </a>
            <!-- Navbar Right Menu -->
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                        <!-- User Account: style can be found in dropdown.less -->
                    <li class="dropdown user user-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <img src="{{ asset('dist/img/user.png') }}" class="user-image" alt="User Image">
                            <span class="hidden-xs">{{--{{ Auth::user()->name }}--}}</span>
                        </a>
                        <ul class="dropdown-menu">
                            <!-- User image -->
                            <li class="user-header">
                                <img src="{{ asset('dist/img/user.png') }}" class="img-circle" alt="User Image">

                                <p>{{--{{ Auth::user()->name }}--}}<small>Membro desde {{--{{ Auth::user()->created_at->format('d/m/Y') }}--}}</small></p>
                            </li>
                            <!-- Menu Body -->
                            {{--<li class="user-body">
                                <div class="row">
                                    <div class="col-xs-4 text-center">
                                        <a href="#">Followers</a>
                                    </div>
                                    <div class="col-xs-4 text-center">
                                        <a href="#">Sales</a>
                                    </div>
                                    <div class="col-xs-4 text-center">
                                        <a href="#">Friends</a>
                                    </div>
                                </div>
                            </li>--}}
                                    <!-- Menu Footer-->
                            <li class="user-footer">
                                {{--<div class="pull-left">
                                    <a href="#" class="btn btn-default btn-flat">Profile</a>
                                </div>--}}
                                <div class="pull-right">
                                    <a href="{{ url('auth/logout') }}" class="btn btn-default btn-flat">Sair</a>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <!-- Control Sidebar Toggle Button -->
                    <li>
                        <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
                    </li>
                </ul>
            </div>

        </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
            <!-- Sidebar user panel -->
            <div class="user-panel">
                <div class="pull-left image">
                    <img src="{{ asset('dist/img/user.png') }}" class="img-circle" alt="User Image">
                </div>
                <div class="pull-left info">
                    <p{{-->{{ Auth::user()->name }}--}}</p>
                    {{--<a href="#"><i class="fa fa-circle text-success"></i> Online</a>--}}
                </div>
            </div>
            <!-- search form -->
            {{--<form action="#" method="get" class="sidebar-form">
                <div class="input-group">
                    <input type="text" name="q" class="form-control" placeholder="Search...">
              <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                </button>
              </span>
                </div>
            </form>--}}
                    <!-- /.search form -->
            <!-- sidebar menu: : style can be found in sidebar.less -->
            <ul class="sidebar-menu">
                <li class="header">MENU PRINCIPAL</li>
                {{-- RECEPCAO --}}
                <li class="treeview active">
                    <a href="#">
                        <i class="fa fa-files-o"></i> <span>Cadastros</span>
                        <span class="pull-right-container">
                                <i class="fa fa-angle-left pull-right"></i>
                            </span>
                    </a>
                    <ul class="treeview-menu">
                        <li><a href="/secao"><i class="fa fa-circle-o"></i>Seções</a></li>
                        <li><a href="/tabela_preco"><i class="fa fa-circle-o"></i>Tabela de preços</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i>Unidade</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i>Locais de entrega</a></li>
                    </ul>
                </li>

                {{-- VENDAS --}}
                    <li class="treeview">
                        <a href="#">
                            <i class="fa fa-money"></i>
                            <span>teste</span>
                            <span class="pull-right-container">
                                <i class="fa fa-angle-left pull-right"></i>
                            </span>
                        </a>
                        <ul class="treeview-menu">
                            <li><a href="#"><i class="fa fa-circle-o"></i>Listar Vendas</a></li>
                            <li><a href="#"><i class="fa fa-circle-o"></i>Nova Venda</a></li>
                        </ul>
                    </li>
                    <li class="treeview">
                        <a href="#">
                            <i class="fa fa-male"></i>
                            <span>teste 2</span>
                            <span class="pull-right-container">
                                <i class="fa fa-angle-left pull-right"></i>
                            </span>
                        </a>
                        <ul class="treeview-menu">
                            <li><a href="#"><i class="fa fa-circle-o"></i> Cadastrar</a></li>
                            <li><a href="#"><i class="fa fa-circle-o"></i> Listar</a></li>
                        </ul>
                    </li>
            </ul>
        </section>
        <!-- /.sidebar -->
    </aside>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            @yield('breadcumb')
        </section>

        <!-- Main content -->
        <section class="content row">
            @if(Session::has('message'))
                <div class="alert alert-success alert-dismissible">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                    <h4><i class="icon fa fa-check"></i> Alerta!</h4>
                    {!! Session::get('message') !!}
                </div>
            @endif
            @if(Session::has('success'))
                <div class="alert alert-success alert-dismissible">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                    <h4><i class="icon fa fa-check"></i> Sucesso!</h4>
                    {!! Session::get('success') !!}
                </div>
            @endif
            @if(Session::has('warning'))
                <div class="alert alert-warning alert-dismissible">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                    <h4><i class="icon fa fa-check"></i> Alerta!</h4>
                    {!! Session::get('warning') !!}
                </div>
            @endif
            @if(Session::has('error'))
                <div class="alert alert-danger alert-dismissible">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                    <h4><i class="icon fa fa-check"></i> Erro!</h4>
                    {!! Session::get('error') !!}
                </div>
            @endif
            <div class="container">
            @yield('content')
            </div>

        </section>
        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->

    <!-- Main Footer -->
    <footer class="main-footer">
        <!-- To the right -->
        <div class="pull-right hidden-xs">
            Desenvolvido Por <a href="http://www.diegoandrade.net.br" target="_blank"> Diego Andrade</a>
        </div>
        <!-- Default to the left -->
        <strong>
            &copy; {{ date('Y') }} by Lab New
        </strong>

    </footer>

    <!-- Control Sidebar -->
    {{--<aside class="control-sidebar control-sidebar-dark">
    <!-- Create the tabs -->
    <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
    <li><a href="#control-sidebar-home-tab" data-toggle="tab"><i class="fa fa-home"></i></a></li>
    <li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i class="fa fa-gears"></i></a></li>
    </ul>
    <!-- Tab panes -->
    <div class="tab-content">
    <!-- Home tab content -->
    <div class="tab-pane" id="control-sidebar-home-tab">
    <h3 class="control-sidebar-heading">Recent Activity</h3>
    <ul class="control-sidebar-menu">
    <li>
        <a href="javascript:void(0)">
            <i class="menu-icon fa fa-birthday-cake bg-red"></i>

            <div class="menu-info">
                <h4 class="control-sidebar-subheading">Langdon's Birthday</h4>

                <p>Will be 23 on April 24th</p>
            </div>
        </a>
    </li>
    <li>
        <a href="javascript:void(0)">
            <i class="menu-icon fa fa-user bg-yellow"></i>

            <div class="menu-info">
                <h4 class="control-sidebar-subheading">Frodo Updated His Profile</h4>

                <p>New phone +1(800)555-1234</p>
            </div>
        </a>
    </li>
    <li>
        <a href="javascript:void(0)">
            <i class="menu-icon fa fa-envelope-o bg-light-blue"></i>

            <div class="menu-info">
                <h4 class="control-sidebar-subheading">Nora Joined Mailing List</h4>

                <p>nora@example.com</p>
            </div>
        </a>
    </li>
    <li>
        <a href="javascript:void(0)">
            <i class="menu-icon fa fa-file-code-o bg-green"></i>

            <div class="menu-info">
                <h4 class="control-sidebar-subheading">Cron Job 254 Executed</h4>

                <p>Execution time 5 seconds</p>
            </div>
        </a>
    </li>
    </ul>
    <!-- /.control-sidebar-menu -->

    <h3 class="control-sidebar-heading">Tasks Progress</h3>
    <ul class="control-sidebar-menu">
    <li>
        <a href="javascript:void(0)">
            <h4 class="control-sidebar-subheading">
                Custom Template Design
                <span class="label label-danger pull-right">70%</span>
            </h4>

            <div class="progress progress-xxs">
                <div class="progress-bar progress-bar-danger" style="width: 70%"></div>
            </div>
        </a>
    </li>
    <li>
        <a href="javascript:void(0)">
            <h4 class="control-sidebar-subheading">
                Update Resume
                <span class="label label-success pull-right">95%</span>
            </h4>

            <div class="progress progress-xxs">
                <div class="progress-bar progress-bar-success" style="width: 95%"></div>
            </div>
        </a>
    </li>
    <li>
        <a href="javascript:void(0)">
            <h4 class="control-sidebar-subheading">
                Laravel Integration
                <span class="label label-warning pull-right">50%</span>
            </h4>

            <div class="progress progress-xxs">
                <div class="progress-bar progress-bar-warning" style="width: 50%"></div>
            </div>
        </a>
    </li>
    <li>
        <a href="javascript:void(0)">
            <h4 class="control-sidebar-subheading">
                Back End Framework
                <span class="label label-primary pull-right">68%</span>
            </h4>

            <div class="progress progress-xxs">
                <div class="progress-bar progress-bar-primary" style="width: 68%"></div>
            </div>
        </a>
    </li>
    </ul>
    <!-- /.control-sidebar-menu -->

    </div>
    <!-- /.tab-pane -->

    <!-- Settings tab content -->
    --}}{{--<div class="tab-pane" id="control-sidebar-settings-tab">
    <form method="post">
    <h3 class="control-sidebar-heading">General Settings</h3>

    <div class="form-group">
        <label class="control-sidebar-subheading">
            Report panel usage
            <input type="checkbox" class="pull-right" checked>
        </label>

        <p>
            Some information about this general settings option
        </p>
    </div>
    <!-- /.form-group -->

    <div class="form-group">
        <label class="control-sidebar-subheading">
            Allow mail redirect
            <input type="checkbox" class="pull-right" checked>
        </label>

        <p>
            Other sets of options are available
        </p>
    </div>
    <!-- /.form-group -->

    <div class="form-group">
        <label class="control-sidebar-subheading">
            Expose author name in posts
            <input type="checkbox" class="pull-right" checked>
        </label>

        <p>
            Allow the user to show his name in blog posts
        </p>
    </div>
    <!-- /.form-group -->

    <h3 class="control-sidebar-heading">Chat Settings</h3>

    <div class="form-group">
        <label class="control-sidebar-subheading">
            Show me as online
            <input type="checkbox" class="pull-right" checked>
        </label>
    </div>
    <!-- /.form-group -->

    <div class="form-group">
        <label class="control-sidebar-subheading">
            Turn off notifications
            <input type="checkbox" class="pull-right">
        </label>
    </div>
    <!-- /.form-group -->

    <div class="form-group">
        <label class="control-sidebar-subheading">
            Delete chat history
            <a href="javascript:void(0)" class="text-red pull-right"><i class="fa fa-trash-o"></i></a>
        </label>
    </div>
    <!-- /.form-group -->
    </form>
    </div>
    <!-- /.tab-pane -->
    </div>
    </aside>--}}{{--
    --}}<!-- /.control-sidebar -->
    <!-- Add the sidebar's background. This div must be placed
    immediately after the control sidebar -->
    <div class="control-sidebar-bg"></div>

</div>
<!-- ./wrapper -->

<!-- jQuery 2.2.3 -->
{{--<script src="{{ asset('plugins/jQuery/jquery-2.2.3.min.js') }}"></script>--}}
<!-- Bootstrap 3.3.6 -->
<script type="text/javascript" src="{{asset('js/manifest.js')}}"></script>
{{--
<script type="text/javascript" src="{{asset('js/bootstrap.js')}}"></script>
--}}

<script type="text/javascript" src="{{asset('js/vendor.js')}}"></script>
<script type="text/javascript" src="{{asset('js/app.js')}}"></script>
<!-- Slimscroll -->
<script src="{{ asset('plugins/slimScroll/jquery.slimscroll.min.js') }}"></script>
<!-- FastClick -->
<script src="{{ asset('plugins/fastclick/fastclick.js') }}"></script>
<!-- AdminLTE App -->
<script src="{{ asset('dist/js/app.min.js') }}"></script>

@yield('script')
</body>
</html>